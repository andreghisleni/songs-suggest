export enum MailTemplate {
  NewUser = 'new-user.hbs',
  NewUserWithRegisterLink = 'new-user-with-register-link.hbs',
  ForgotPassword = 'forgot-password.hbs',
  NewOrganization = 'new-organization.hbs',
  InviteUser = 'invite-user.hbs',
  InviteNewUser = 'invite-new-user.hbs',
}

export type MailTemplateData = {
  [MailTemplate.NewUser]: {
    name: string;
  };
  [MailTemplate.ForgotPassword]: {
    name: string;
    reset_url: string;
  };
  [MailTemplate.NewOrganization]: {
    name: string;
    organization: {
      name: string;
    };
  };
  [MailTemplate.InviteUser]: {
    name: string;
    author: { name: string };
    org: { name: string };
    accept_invite_url: string;
  };
  [MailTemplate.InviteNewUser]: {
    name: string;
    author: { name: string };
    org: { name: string };
    accept_invite_url: string;
    create_account_accept_invite_url: string;
  };
  [MailTemplate.NewUserWithRegisterLink]: {
    name: string;
    org: {
      name: string;
    };
    session: {
      name: string;
    };
  };
};

export interface ISendEmail<T extends MailTemplate> {
  to: {
    name: string;
    email: string;
  };
  subject: string;

  template: {
    name: T;

    data: MailTemplateData[T];
  };
}
