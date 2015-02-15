class Attraction
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :rating, type: Integer
  field :review_count, type: Integer
  field :longlat, type: Hash
  field :yelp_id, type: String

  belongs_to :location
  has_and_belongs_to_many :categories

  validates_presence_of :name, :longlat, :yelp_id
  validates_uniqueness_of :yelp_id

  def longitude
    self.longlat.coordinates[0]
  end

  def latitude
    self.longlat.coordinates[1]
  end

  def coordinate_hash
    { latitude: self.longlat.coordinates[1], longitude: self.longlat.coordinates[0] }
  end

  def self.search_within(geometry)
    Attraction.where("longlat.coordinates" => {
                      "$geoWithin" => {
                          "$geometry" => geometry
                        }
                      })
  end

end

# { "type" => "Polygon", "coordinates" => [[[0.0, 0.0], [-90.0, 0.0], [-90.0, 50.0], [0.0, 50.0], [0.0, 0.0]]] }


