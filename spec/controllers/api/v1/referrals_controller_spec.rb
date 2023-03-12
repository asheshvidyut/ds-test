require 'rails_helper'
require 'spec_helper'
RSpec.describe Api::V1::ReferralsController, type: :controller do

  let(:email) { 'test_user1@example.com' }
  let(:password) { 'password' }
  let!(:user) { create(:user, email: email, password: password, password_confirmation: password) }
  let!(:referral) {create(:referral, user_id: user.id, email: 'referred_email@gmail.com')}

  describe "GET index" do

    before do
      @request.env["devise.mapping"] = Devise.mappings[:user]
    end

    context "UnAuth user" do
      it "returns a redirect response" do
        response = get :index
        expect(response.status).to eql(302)
      end
    end

    context 'Auth user' do
      it "return 200 response" do
        sign_in user
        response = get :index, params: {}
        expect(response.status).to eql(200)
        expect(response.body).to eql([referral].to_json)
      end
    end
  end

  describe "POST create" do
    before do
      @request.env["devise.mapping"] = Devise.mappings[:user]
    end

    context "UnAuth user" do
      it "returns a redirect response" do
        response = get :index
        expect(response.status).to eql(302)
      end
    end

    context 'Auth user' do
      it "return 200 response" do
        sign_in user
        expect(ReferralMailer).to receive(:send_email).and_return(double("Mailer", :deliver_now => true))
        response = post :create, params: {email: "spiderman@gmail.com"}
        expect(response.status).to eql(201)
        get_response = get :index
        expect(JSON.parse(get_response.body).length).to eql(2)
        expected_emails = ['spiderman@gmail.com', 'referred_email@gmail.com']
        expect(JSON.parse(get_response.body).map{|i| i['email']}.sort).to eql(expected_emails.sort)
      end
    end

  end

end