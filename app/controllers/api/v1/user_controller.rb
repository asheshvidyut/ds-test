class Api::V1::UserController < ApplicationController
  before_action :authenticate_user!

  def user_details
    render json: current_user
  end

end
