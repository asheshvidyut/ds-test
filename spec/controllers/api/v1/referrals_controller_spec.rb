require 'rails_helper'
require 'spec_helper'
RSpec.describe Api::V1::ReferralsController, type: :controller do

  let(:email) { 'test_user1@example.com' }
  let(:password) { 'password' }
  let!(:user) { create(:user, email: email, password: password, password_confirmation: password) }
  let(:valid_session) { {} }

  describe "GET index" do

    before do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      allow_any_instance_of(Devise::Controllers::Helpers).to receive(:user_signed_in?).and_return(false)
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
        response = get :index, params: {}, session: valid_session
        expect(response.status).to eql(200)
      end
    end

  end
end