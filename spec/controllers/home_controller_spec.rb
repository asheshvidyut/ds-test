require 'rails_helper'
RSpec.describe HomeController, type: :controller do

  describe "GET index" do

    context "UnAuth user" do
      it "returns a redirect response" do
        response = get :index
        expect(response.status).to eql(302)
      end
    end


  end
end