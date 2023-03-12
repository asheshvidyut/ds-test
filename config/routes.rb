Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root to: 'home#index'

  get 'signin' => 'home#signin', as: :sign_in_path
  get 'signup' => 'home#signup', as: :sign_up_path
  get 'create-referral' => 'home#index', as: :create_referral_path

  get 'user_details' => 'api/v1/user#user_details', as: :user_details_path

  get 'referrals' => 'api/v1/referrals#index', as: :user_referrals_path
  post 'referrals' => 'api/v1/referrals#create', as: :send_referral_path

end
