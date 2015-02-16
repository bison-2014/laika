class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword

  field :name, type: String
  field :email, type: String
  field :password_digest, type: String

  has_secure_password

  has_many :trips
  has_many :interests, class_name: "Category"

  validates_presence_of :name, :email
  validates_uniqueness_of :email

end
