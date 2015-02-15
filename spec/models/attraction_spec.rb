require 'rails_helper'
require 'mongoid_helper'

RSpec.describe Attraction do

    it { is_expected.to belong_to(:location) }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:longlat) }
    it { is_expected.to validate_presence_of(:yelp_id) }
    it { is_expected.to validate_uniqueness_of(:yelp_id) }

end
