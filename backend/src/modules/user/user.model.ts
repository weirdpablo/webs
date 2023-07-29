import typegoose,{ pre, prop, modelOptions, getModelForClass, index, Ref } from "@typegoose/typegoose";
import validator from 'validator';
import bcrypt from 'bcryptjs';

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
@index({ email: 1 })
@pre<User>('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 8);
    }
    next();
})
export class User {
    @prop({ required: true, trim: true })
    username: string = '';

    @prop({ required: true, unique: true, trim: true, lowercase: true, type: String, validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      } })
    email: string = '';

    @prop({ required: true, trim: true, minlength: 8,  validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      }, private: true })
    password: string = '';
    @prop({ default: 'user' })
    role: string = 'user';

     /**
     * Check if password matches the user's password
     * @param {string} password
     * @returns {Promise<boolean>}
     */
     async isPasswordMatch(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
    }

};
const userModel = getModelForClass(User);
export default userModel;