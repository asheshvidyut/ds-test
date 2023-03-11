class HomeController < ApplicationController
  before_action :authenticate_user!, only: :index
  def index
  end

  def signin

  end

  def signup

  end

  private

  def authenticate_user!
    if user_signed_in?
      super
    else
      redirect_to :sign_in_path
    end
  end
end
