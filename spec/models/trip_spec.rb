require 'rails_helper'
require 'mongoid_helper'

RSpec.describe Trip, type: :model do

    it { is_expected.to validate_presence_of(:origin) }
    it { is_expected.to validate_presence_of(:destination) }
    it { is_expected.to have_many(:waypoints) }

end
