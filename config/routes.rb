Rails.application.routes.draw do
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
  get 'user_details' => 'api/v1/user#user_details', as: :user_details_path

end
