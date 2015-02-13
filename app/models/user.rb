class User
  include Mongoid::Document
  field :name, type: String
  field :email, type: String
  field :password_hash, type: String

  has_many :trips
  has_many :interests, class_name: "Category"
end
