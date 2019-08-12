# == Schema Information
#
# Table name: users
#
#  id                     :bigint(8)        not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  first_name             :string           default("")
#  last_name              :string           default("")
#  username               :string           default("")
#  phone_number           :string           default("")
#

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :validatable

  # after_create :welcome_email

  def error_message
    self.errors.full_messages.to_sentence
  end

  def welcome_email
    UserMailer.welcome_email(self).deliver_now
  end

  def reset_password_email
    if self.update(reset_password_token: generate_reset_token)
      UserMailer.reset_password_email(self).deliver_now
    end
  end

  private

  def generate_reset_token
    loop do
      token = SecureRandom.random_number.to_s
      token = token.split('.')[1][0...8]
      break token unless User.where(reset_password_token: token).exists?
    end
  end
end
