if Rails.env.development?
  API_KEYS = YAML.load_file('config/api_keys_development.yml')[Rails.env].with_indifferent_access
else
  API_KEYS = YAML.load_file('config/api_keys.yml')[Rails.env].with_indifferent_access
end
