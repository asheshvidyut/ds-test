class ReferralMailer < ApplicationMailer

  include Rails.application.routes.url_helpers

  def send_email(email, from_email)
    @url = sign_up_path_url
    mail(to: email, from: from_email, subject: "Sign Up on DirectShift")
  end

end
