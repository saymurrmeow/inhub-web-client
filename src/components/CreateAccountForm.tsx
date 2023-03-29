import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import { theme, Text, Form, FormGroup, Label, Input, Hint, Layout, Button } from 'src/components';
import { Display, FlexDirection, BorderRadius, Color, Margin, Padding } from 'src/components/core';
import { CreateAcoountController } from 'src/models/account.controller';

interface Props {
  form: CreateAcoountController;
  captchaKey: string;
}

export const CreateAccountForm: React.FC<Props> = observer(({ form, captchaKey }) => {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const navigate = useNavigate();
  const onUsernameChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    form.usernameField.setValue(target.value);
  };

  const onEmailChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    form.emailField.setValue(target.value);
  };

  const onPasswordChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    form.passwordField.setValue(target.value);
  };

  const handleCreateAccount = (e: SyntheticEvent) => {
    e.preventDefault();
    // form.onCreateAccount();
    //
    // if (location.pathname === '/') {
    //   navigate('join');
    // }
  };

  const onCaptchaChange = () => {
    const token = captchaRef.current?.getValue();
    form.humanVerify(token as string);
  };

  return (
    <Form {...styles.form}>
      <Text size="x-large" weigth="500" color={Color.TextRegular}>
        Register to Share Your Expertise
      </Text>
      <Text {...styles.secondaryText}>
        Already have an account? <Link to="/singin">sing in</Link>
      </Text>
      <FormGroup>
        <Label id="username" label="Username" />
        <Input
          value={form.usernameField.value}
          onChange={onUsernameChange}
          error={form.usernameField.error}
          name="username"
        />
      </FormGroup>
      <FormGroup>
        <Label id="email" label="Email" />
        <Input
          value={form.emailField.value}
          onChange={onEmailChange}
          error={form.emailField.error}
          name="email"
        />
      </FormGroup>
      <FormGroup>
        <Label id="password" label="Password" />
        <Input
          value={form.passwordField.value}
          onChange={onPasswordChange}
          error={form.passwordField.error}
          name="password"
          secure
        />
        <Hint>
          Make sure it's at least 15 characters OR at least 8 characters including a number and a
          lowercase letter.
        </Hint>
      </FormGroup>
      <ReCAPTCHA size="normal" sitekey={captchaKey} onChange={onCaptchaChange} ref={captchaRef} />
      <Layout padding={{ top: 0.5 }}>
        <Button
          onClick={handleCreateAccount}
          size="lg"
          variant="primary"
          disabled={!form.isFullfilled}
          fullWidth
        >
          Create account
        </Button>
      </Layout>
      <Text {...styles.secondaryText}>
        By clicking «Create account», you agree to our{' '}
        <a target="_blank" href="/">
          Terms of Service
        </a>{' '}
        and{' '}
        <a target="_blank" href="/">
          Privacy Statement
        </a>
        . We’ll occasionally send you account related emails.
      </Text>
    </Form>
  );
});

const styles = {
  form: {
    display: Display.Flex,
    flexDirection: FlexDirection.Column,
    padding: { x: 2, y: 2 } as Padding, // TODO ???
    margin: { top: 1 } as Margin,
    borderRadius: BorderRadius.Medium,
    backgroundColor: Color.White,
  },
  secondaryText: {
    size: theme.textSecondarySize,
    color: Color.Secondary,
    padding: { bottom: 1, top: 0.5 } as Padding,
  },
};
