# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'csv'

# seed one user, if he/she doesn't exist
def seed_user
  user = User.find_by(email: 'joe@email.com')
  if user
    puts "Dummy user has already been added."
  else
    user = User.create!(name: 'joe', email: 'joe@email.com', password: 'password')
    user.interests.push(Category.find_by(subcategory_name: "Arcades"))
    user.save!
    puts "Added dummy user '#{user.name}' with email '#{user.email}' to Users."
  end
end

# Pick a route

def seed_locations
  # seed cities
  CSV.foreach('db/demo-cities.csv', headers: true) do |row|
    longlat = { type: "Point", coordinates: [row['longitude'], row['latitude']] }
    Location.find_or_create_by(city: row['city'],
                             region: row['region'],
                            longlat: longlat)
  end

  # seed parks
  # TODO
end

def seed_categories
  CSV.foreach('db/demo-yelp-categories.csv', headers: true) do |row|
    Category.find_or_create_by(name: row['name'],
                               code: row['code'],
                   subcategory_code: row['subcategory_code'],
                   subcategory_name: row['subcategory_name'])
  end
end

def has_location?(business)
  business.respond_to?(:location) && business.location.respond_to?(:coordinate) && business.location.respond_to?(:city) && business.location.respond_to?(:state_code)
end

def has_categories?(business)
  business.respond_to?(:categories)
end

def has_website?(business)
  business.respond_to?(:url)
end

def seed_attractions
  Location.each do |location|
    Category.each do |category|

      # check if you have already requested Yelp for this location and category
      unless Seed.find_by(location: location, category: category)
        puts "Searching for #{category.subcategory_code} in #{location.city}, #{location.region}"

        result = Yelp.client.search_by_coordinates(
              {  latitude: location.latitude,
                longitude: location.longitude },
              {           sort: 2,
               category_filter: category.subcategory_code,
                 radius_filter: 40000 })

        result.businesses.select { |business| has_location?(business) && has_categories?(business) && has_website?(business) }.each do |business|
          a = Attraction.find_or_initialize_by(yelp_id: business.id)
          a.update_attributes(name: business.name,
                            rating: business.rating,
                           longlat: {
                                type: "Point",
                         coordinates: [business.location.coordinate.longitude, business.location.coordinate.latitude]
                                    },
                      review_count: business.review_count,
                          location: location,
                              city: business.location.city,
                             state: business.location.state_code,
                   yelp_categories: business.categories,
                          yelp_url: business.url,
                   yelp_mobile_url: business.mobile_url,
                        )
          a.categories.push(category) unless a.categories.include?(category)
          a.save!
        end # end result.businesses.each

        Seed.create!(location: location, category: category)
      end # end unless

    end
  end

end

Yelp.client.configure do |config|
  config.consumer_key = API_KEYS['yelp_consumer_key']
  config.consumer_secret = API_KEYS['yelp_consumer_secret']
  config.token = API_KEYS['yelp_token']
  config.token_secret = API_KEYS['yelp_token_secret']
end

seed_locations
seed_categories
seed_attractions
seed_user
