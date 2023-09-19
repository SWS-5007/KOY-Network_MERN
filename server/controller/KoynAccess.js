const KoynAccessRequests = require("../model/KoynAccessRequest");
const KoynAccounts = require("../model/KoynAccounts");

const TMClient = require("textmagic-rest-client");
const tmc = new TMClient("eugeneluzgin", "9VfXnMSqjZBa5sTlcB3Qp0XJ3LGxGd");

exports.create_request = function (req, res) {
  const request = new KoynAccessRequests(req.body);
  try {
    request.save(function (err, request) {
      if (err) {
        res.status(500).send(err);
      } else {
        notifyManager(request);
        res.json(request);
      }
    });
  } catch (err) {
    console.log("Error saving access request", err);
    res.status(500).send(err);
  }
};

exports.list_requests = function (req, res) {
  const condition = {};
  if (req.query && req.query.manager_name) {
    condition.manager_name = req.query.manager_name;
  }
  KoynAccessRequests.find(condition, function (err, requests) {
    if (err) res.status(500).send(err);
    res.json(requests);
  });
};

function notifyManager(request) {
  const userName = request.user_name;
  const managerName = request.manager_name;
  // Find user first:
  KoynAccounts.findOne({ chain_name: userName }, function (err, user) {
    if (err) {
      console.log("Error finding user", userName, err);
    } else {
      // Then find manager:
      KoynAccounts.findOne(
        { chain_name: managerName },
        function (err, manager) {
          if (err) {
            console.log("Error finding manager", managerName, err);
          } else {
            let message =
              "New user " +
              user.full_name +
              " [" +
              userName +
              "] is requesting access. Contact cell: " +
              user.cell_phone +
              ". Login to ProductLogger app to approve!";
            let cellphone = formatCellNumber(manager.cell_phone);
            tmc.Messages.send(
              { text: message, phones: cellphone },
              function (err, res) {
                console.log("Message sent to " + cellphone, err, res);
              }
            );
          }
        }
      );
    }
  });
}

function formatCellNumber(cellphone) {
  const formattedCellNumber = cellphone.replace(/[^0-9]/g, "");
  //US cell number without country code:
  if (formattedCellNumber.length == 10) {
    formattedCellNumber = "1" + formattedCellNumber;
  }
  return formattedCellNumber;
}
