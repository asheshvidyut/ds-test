class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  def after_sign_in_path_for(resource)
    root_path(current_user) # your path
  end

  def authenticate_user!
    params.permit(:email)
    if user_signed_in?
      super
    else
      redirect_to :sign_in_path
    end
  end

end
