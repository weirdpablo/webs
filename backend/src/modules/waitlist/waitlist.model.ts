import typegoose,{ pre, prop, modelOptions, getModelForClass, index, Ref } from "@typegoose/typegoose";
import validator from 'validator';

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Waitlist {
    @prop({ required: true, trim: true })
    name: string = '';

    @prop({ required: true, unique: true, trim: true, lowercase: true, type: String, validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      } })
    email: string = '';

    @prop({ reqquired: true, trim: true })
    role: string = "";

};
const waitlistModel = getModelForClass(Waitlist);
export default waitlistModel;