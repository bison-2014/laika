class MapsController < ApplicationController

  respond_to :json

  def index
  end

  def search
    geometry = params['features'][0]['geometry']
    @attractions = Attraction.search_within(geometry).all.to_a
    render json: { attractions: @attractions }
  end

  def directions
  end

end