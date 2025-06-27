import ContextType from '../../../graphql/ContextType';
import bcrypt from 'bcryptjs';
import moment from 'moment-timezone';
import { AuthenticationError, UserInputError } from 'apollo-server';
import Validation from 'src/function/validation';

export const ChangePasswordHREmployeeMutation = async (_, { password }: { password: string }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const admin_id = await ctx.authUser.user.id;
  const validation = new Validation({ password: password })

  if (password === undefined || '') {
    throw new UserInputError('ព័ត៌ត្រូវបំពេញ')
  }

  validation.isRequired(['password-ពាក្យសម្ងាត់'], 'ត្រូវបំពេញ')
  validation.isSpecialCharacter(['password-ពាក្យសម្ងាត់'], 'ត្រូវមានសញ្ញាពិសេស')
  validation.isUppercaseLetter(['password-ពាក្យសម្ងាត់'], 'យ៉ាងហោចណាស់ត្រូវមានតួរអក្សរធំមួយ')
  validation.isLowercaseLetter(['password-ពាក្យសម្ងាត់'], 'យ៉ាងហោចណាស់ត្រូវមានតួរអក្សរតូចមួយ')
  validation.maxCharacter(['password-ពាក្យសម្ងាត់'], 64, 'ត្រូវមានចំនួន 64 តួរអក្សរយ៉ាងច្រើន')
  validation.minCharacter(['password-ពាក្យសម្ងាត់'], 6, 'ត្រូវមានចំនួន 6 តួរអក្សរយ៉ាងតិច')
  validation.containNumber(['password-ពាក្យសម្ងាត់'], 'យ៉ាងហោចណាស់ត្រូវមានលេខចំនួនមួយតួរ')

  if (validation.isError()) {
    validation.throwError();
  }

  const hash = bcrypt.hashSync(password, 12);

  const changePassword = await knex
    .table('hr_employees')
    .update({ password: hash })
    .where({ id: admin_id });

  if (changePassword > 0) {
    await knex.table('activity_log').insert({
      user_id: admin_id,
      type: 'AUTHENTICATION',
      activity: JSON.stringify(
        `{'ip':'${ctx.ip}','activityType': 'change_password', 'employee_id': '${admin_id}', 'logged_at': '${moment().tz('Asia/Phnom_Penh').format(
          'DD-MM-YYYY hh:mm:ss A',
        )}'}`,
      ),
    });

    return changePassword > 0;
  } else {
    throw new AuthenticationError('Something went wrong');
  }
};
