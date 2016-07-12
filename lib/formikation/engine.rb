module Formikation
  module Rails
    class Engine < ::Rails::Engine
      initializer 'formikation' do | app |
        formikation_path = File.expand_path("../../../dist", __FILE__)
        app.config.assets.paths << formikation_path
        formikation_themes_path = File.expand_path("../../../dist/themes", __FILE__)
        app.config.assets.paths << formikation_themes_path
        app.middleware.use ::ActionDispatch::Static, "#{root}/dist"
      end
    end
  end
end
