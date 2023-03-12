require 'rails_helper'
RSpec.describe HomeController, type: :controller do

  describe "GET index" do
    before do
      allow_any_instance_of(Devise::Controllers::Helpers).to receive(:user_signed_in?).and_return(false)
    end

    context "UnAuth user" do
      it "returns a redirect response" do
        response = get :index
        expect(response.status).to eql(302)
      end
    end


  end
end