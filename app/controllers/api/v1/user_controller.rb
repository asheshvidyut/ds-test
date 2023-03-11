class Api::V1::UserController < ApplicationController
  before_action :authenticate_user!

  def user_details
    render json: current_user
  end

  def create_referral
    if Referral.exists?(email: create_referral_params[:email])
      render json: {message: 'Email already referred'}
      return
    end
    r = Referral.new
    r.email = create_referral_params[:email]
    r.user_id = current_user.id
    r.save!
    email = create_referral_params[:email]
    ReferralMailer.send_email(email, current_user.email).deliver_now
    render json: {message: :ok}, status: :created
  end

  def create_referral_params
    params.permit(:email)
  end

  def referrals
    render json: current_user.referrals
  end

end
