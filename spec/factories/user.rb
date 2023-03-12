FactoryGirl.define do
  factory :user do |f|
    f.email "directshift@gmail.com"
    f.password "ruby"
    f.password_confirmation "ruby"
  end
end