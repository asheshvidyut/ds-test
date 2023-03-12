require 'rails_helper'

RSpec.describe User, type: :model do

  context 'User creation' do  # (almost) plain English
    it 'cannot create user' do
      u = User.create({email: "invalid_email", password: ''})
      expect { u.save! }.to raise_error(ActiveRecord::RecordInvalid)  # test code
    end

    it 'cannot create user' do
      u = User.create({email: "ashesh.vidyut@gmail.com", password: ''})
      expect { u.save! }.to raise_error(ActiveRecord::RecordInvalid)  # test code
    end

    it 'creates user' do
      u = User.new({email: "ashesh.vidyut@gmail.com", password: 'directshift'})
      expect(u.valid?).to be_truthy
      u.save!
      expect(u.persisted?).to be_truthy
    end

  end

end
