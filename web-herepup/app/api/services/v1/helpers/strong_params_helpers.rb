module Services
  module V1
    module Helpers
      module StrongParamsHelpers
        extend Grape::API::Helpers

        def params_permit(*args)
          args.map { |e| k, v = e, params[e]; [k, v] }.to_h
        end
      end
    end
  end
end