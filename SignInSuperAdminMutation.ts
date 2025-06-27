import ContextType from '../../../graphql/ContextType';
import { table_users } from '../../../generated/tables/table_users';
import { Graph } from '../../../generated/graph';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { GraphQLError } from 'graphql';
import moment from 'moment';

export const SignInSuperAdminMutation = async (_, { input }: { input: Graph.SignInInput }, ctx: ContextType) => {
  const knex = ctx.knex.default;
  const getUser: table_users = await knex
    .table('super_admin')
    .where({
      username: input.username,
    })
    .first();

  if (input.password === '' && input.username === '') {
    throw new GraphQLError(
      `{"errorMessage": "Your username or password are empty", "typeError": "user_not_field_the_form"}`,
    );
  }

  if (getUser === undefined) {
    throw new GraphQLError(
      `{"errorMessage": "Your username or password is incorrect!", "typeError": "wrong_username_or_password"}`,
    );
  }

  const checkPassword = bcrypt.compareSync(input.password, getUser.password);

  if (getUser === undefined && !checkPassword) {
    throw new GraphQLError(
      `{"errorMessage": "Your username or password is incorrect!", "typeError": "wrong_username_or_password"}`,
    );
  }

  if (!checkPassword) {
    throw new GraphQLError(`{"errorMessage": "Your password is incorrect!", "typeError": "wrong_password"}`);
  }

  const randomToken = crypto.randomBytes(64).toString('hex');

  await knex.table('super_admin_token').insert({
    super_admin_id: getUser.id,
    token: randomToken,
  });

  return {
    token: randomToken,
  };
};
