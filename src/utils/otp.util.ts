import { Twilio } from 'twilio';

const constants = {
  twilioAccountSID: 'AC5718f065f2b34296a6aa889f794b41b9',
  twilioAuthToken: '3633335a0315e0a97c78125c68bec17c',
  twilioPhoneNumber: '+17608245057',
};

const { twilioAccountSID, twilioAuthToken, twilioPhoneNumber } = constants;
const client = new Twilio(twilioAccountSID, twilioAuthToken);

export const sendSMS = async (phoneNumber: string, message: string) => {
  try {
    const smsResponse = await client.messages.create({
      from: twilioPhoneNumber,
      to: phoneNumber,
      body: message,
    });
    return smsResponse;
  } catch (error) {
    error.statusCode = 400;
    throw error;
  }
};

export const generateOtp = () => {
  let otp = '';

  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }

  return otp;
};
