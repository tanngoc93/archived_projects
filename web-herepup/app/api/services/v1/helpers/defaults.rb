module Services
  module V1
    module Helpers
      module Defaults
        extend Grape::API::Helpers
        include Services::V1::Helpers::StrongParamsHelpers

        def error_response(message, status_code)
          status status_code
          {
            status: 'error',
            message: message
          }
        end

        def authenticate_request!
          unless user_id_in_token?
            error_response('Not Authenticated', :unauthorized) and return
          end

          @current_user = User.find(auth_token[:user_id])
        rescue ActiveRecord::RecordNotFound
          error_response('User Not Found', :not_found)
        rescue JWT::VerificationError, JWT::DecodeError
          error_response('Not Authenticated', :unauthorized)
        end

        private

        def http_token
          @http_token ||= if request.headers['Authorization'].present?
            request.headers['Authorization'].split(' ').last
          end
        end

        def auth_token
          @auth_token ||= JsonWebToken.decode(http_token)
        end

        def user_id_in_token?
          http_token && auth_token && auth_token[:user_id].to_i
        end
      end
    end
  end
end