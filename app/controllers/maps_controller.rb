class MapsController < ApplicationController

  def index
  end

  def search
    # respond_to :json
    # polygon = params

    10.times {puts}
    p params
    10.times {puts}
    geometry = params['features'][0]['geometry']
    p Attraction.search_within(geometry).all.to_a
    redirect_to "/"
  end

end