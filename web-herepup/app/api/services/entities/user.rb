module Services
  module Entities
    class User < Grape::Entity
      expose :status
      expose :user do
        expose :id
        expose :email
        expose :username
        expose :first_name
        expose :last_name
        expose :phone_number
      end

      private

      def status
        'success'
      end
    end
  end
end