require 'rails_helper'

RSpec.describe Referral, type: :model do
  context 'Referral creation' do  # (almost) plain English
    it 'cannot create referral' do
      r = Referral.new
      r.email = "batman@gmail.com"
      expect { r.save! }.to raise_error(ActiveRecord::RecordInvalid)  # test code
    end

    it 'creates referral' do
      r = Referral.new
      r.email = "superman@gmail.com"
      r.user_id = 1
      expect(r).to be_new_record
      r.save!
      expect(r).to be_persisted
    end

    it 'does not save duplicate referral' do
      r = Referral.new
      r.email = "superman@gmail.com"
      r.user_id = 1
      expect(r).to be_new_record
      r.save!
      expect(r).to be_persisted
      r = Referral.new
      r.email = "superman@gmail.com"
      r.user_id = 1
      expect{ r.save! }.to raise_error(ActiveRecord::RecordNotUnique)
    end
  end
end
