import mongooseRole from 'mongoose-role';
import bcrypt from 'bcryptjs';

function getUserMiddleware(userSchema) {
  userSchema.pre('save', function (next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError);
        } else {
          bcrypt.hash(user.password, salt, function (hashError, hash) {
            if (hashError) {
              return next(hashError);
            }
            user.password = hash;
            next();
          });
        }
      });
    } else {
      return next();
    }
  });

  const roles = ['public', 'user', 'admin'];

  const accessLevels = {
    public: ['public', 'user', 'admin'],
    anon: ['public'],
    user: ['user', 'admin'],
    admin: ['admin'],
  };

  userSchema.plugin(mongooseRole, {
    roles,
    accessLevels,
  });

  return userSchema; // Return the modified userSchema
}

export default getUserMiddleware; // Remove the parentheses here
