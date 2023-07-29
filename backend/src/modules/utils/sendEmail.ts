import handlebars from 'handlebars';
import fs from "fs";
import { Resend } from "resend"
import path from "path";
import { ApiError } from '../errors';
import config from '../../config/config';
const resend = new Resend(config.email.apiKey) 

export const sendEmail = async (
    email: string,
    subject: string,
    payload: Object,
    template: string
  ) => {
    try {
      const templatesDirectory = path.join(process.cwd(), "src/templates");
      const source = fs.readFileSync(`${templatesDirectory}/${template}`, 'utf-8');
      const compiledTemplate = handlebars.compile(String(source));
      const message = {
        from: config.email.from,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
      await new Promise(async (resolve, reject) => {
        try{
            const data = await resend.emails.send(message); 
            console.log({data});
            return data;
        } catch(err) {
            return err
        }
      });
      return true;
    } catch (error) {
      new ApiError(401, `Invalid credentials - ${error}`);
      return false;
    }
  };
  