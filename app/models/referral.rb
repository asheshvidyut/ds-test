class Referral < ApplicationRecord
  validates :user_id, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
end
