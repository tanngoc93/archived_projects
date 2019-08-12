Rails.application.routes.draw do
  mount Services::Api => '/'
end
