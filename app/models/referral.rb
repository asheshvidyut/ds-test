class Referral < ApplicationRecord
  validates :user_id, presence: true
end
