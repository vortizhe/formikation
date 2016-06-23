module Formikation
  module Rails
    class Engine < ::Rails::Engine
      initializer 'mqbe' do | app |
        formikation_path = File.expand_path("../../../dist", __FILE__)
        app.config.assets.paths << formikation_path
        app.middleware.use ::ActionDispatch::Static, "#{root}/dist"
      end
    end
  end
end
