class Attraction
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :rating, type: Integer
  field :review_count, type: Integer
  field :coordinates, type: Array
  field :yelp_id, type: Integer

  belongs_to :location
  has_and_belongs_to_many :categories

  def latitude
    self.coordinate[0]
  end

  def longitude
    self.coordinate[1]
  end

end
