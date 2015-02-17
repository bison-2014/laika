if Rails.env.development?
  API_KEYS = YAML.load(ERB.new(File.read('config/api_keys_development.yml')).result)[Rails.env].with_indifferent_access
else
  API_KEYS = YAML.load(ERB.new(File.read('config/api_keys.yml')).result)[Rails.env].with_indifferent_access
end

GOOGLE_KEY = API_KEYS['google_key']