class UserMailer < ApplicationMailer
  default from: 'api@herepuppy.example'
 
  def welcome_email user
    @user = user
    mail(to: @user.email, subject: 'Welcome to My Here Puppy Application')
  end

  def reset_password_email user
    @user = user
    mail(to: @user.email, subject: 'Reset password for Here Puppy Application')
  end
end
