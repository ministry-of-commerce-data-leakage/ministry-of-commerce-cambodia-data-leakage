import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';
import moment from 'moment-timezone';
import { AuthenticationError } from 'apollo-server';
import Validation from 'src/function/validation';

export const UpdateMeMutation = async (
  _,
  { id, input }: { id: number; input: Graph.MeInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  if (!ctx.authUser.user?.token) {
    throw new AuthenticationError("អ្នកមិនត្រូវបានអនុញ្ញាតឱ្យចូលប្រព័ន្ធទេ")
  }

  const admin_id = await ctx.authUser.user.id;

  const validation = new Validation(input);

  validation.isRequired(['username-ឈ្មោះចូលគណនី', 'fullname-គោត្តនាម និង នាម', 'password-ពាក្យសម្ងាត់', 'profile_picture-រូបភាពគណនី', 'email-អ៊ីម៉ែល', 'phoneNumber-លេខទូរស័ព្ទ'], 'ត្រូវបំពេញ');
  validation.isValidEmail(['email-អ៊ីម៉ែល']);
  validation.isDomainEmail(['email-អ៊ីម៉ែល'], 'moc.gov.kh');
  validation.isDomainEmail(['username-ឈ្មោះចូលគណនី'], 'moc.gov.kh');
  validation.isSpecialCharacter(['password-ពាក្យសម្ងាត់'])
  validation.isUppercaseLetter(['password-ពាក្យសម្ងាត់'])
  validation.isLowercaseLetter(['password-ពាក្យសម្ងាត់'])
  validation.maxCharacter(['password-ពាក្យសម្ងាត់'], 64)
  validation.minCharacter(['password-ពាក្យសម្ងាត់'], 6)
  validation.containNumber(['password-ពាក្យសម្ងាត់'])
  validation.isValidPhonNumber(['phoneNumber-លេខទូរស័ព្ទ'])

  if (validation.isError()) {
    validation.throwError();
  }

  const updateMe = await knex('users')
    .update({
      fullname: input?.fullname ? input?.fullname : undefined,
      phone_number: input?.phoneNumber ? input?.phoneNumber : undefined,
      email: input?.email ? input?.email : undefined,
      profile_picture: input?.profile_picture ? input?.profile_picture : null,
    })
    .where({ id });

  if (updateMe > 0) {
    await knex.table('activity_log').insert({
      user_id: admin_id,
      type: 'USER',
      activity: JSON.stringify(
        `{'ip':'${ctx.ip}','activityType': 'update_me', 'user_id': '${updateMe}', 'logged_at': '${moment().tz('Asia/Phnom_Penh').format(
          'DD-MM-YYYY hh:mm:ss A',
        )}'}`,
      ),
    });

    return updateMe > 0;
  } else {
    throw new AuthenticationError('Something went wrong');
  }
};
