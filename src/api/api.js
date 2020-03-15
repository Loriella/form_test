import Sendsay from "sendsay-api";

export const API_KEY = "18HvtaCOtIOr_VAI1J-Fl-8APx71OpA3nlz96yj_PCcKM1db-mbuA5dzXAqHmopLD2BxRsuI";

const sendsay = new Sendsay({apiKey: API_KEY});

export function sendMail(toEmail, letter) {
  return sendsay.request(
    {
      action: "issue.send.test",
      letter,
      "sendwhen": "test",
      "mca": [
        toEmail,
      ]
    })
}

export function getMailStatus(id) {
  return sendsay.request(
    {
      "action": "track.get",
      "id": id,
    }
  )
}
