class HomeController < ApplicationController
  before_action :authenticate_user!, except: [:signin, :signup]
  def index
  end

  def create_referral

  end

  def signin

  end

  def signup

  end

end
