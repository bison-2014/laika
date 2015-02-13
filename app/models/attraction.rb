class Attraction
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :rating, type: Integer
  field :num_of_reviews, type: Integer
  field :latitude, type: Float
  field :longitude, type: Float
  field :yelp_id, type: Integer

  has_many :categories
end
