class HomeController < ApplicationController
  before_action :redirect_if_unauth, only: :index
  def index
  end

  def signin

  end

  def redirect_if_unauth
    unless user_signed_in?
      redirect_to :sign_in_path
    end
  end

end
