class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  def after_sign_in_path_for(resource)
    root_path(current_user) # your path
  end
end
