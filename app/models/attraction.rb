class Attraction
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :rating, type: Integer
  field :review_count, type: Integer
  field :longlat, type: Hash
  field :yelp_id, type: Integer

  belongs_to :location
  has_and_belongs_to_many :categories

  def longitude
    self.longlat.coordinates[0]
  end

  def latitude
    self.longlat.coordinates[1]
  end

  def coordinate_hash
    { latitude: self.longlat.coordinates[1], longitude: self.longlat.coordinates[0] }
  end

end
