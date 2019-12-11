require 'faker'

10.times do
    department = Department.create(
        name: Faker::Commerce.department
    )

    100.times do
    department.products.create(
        name: Faker::Commerce.product_name,
        description: Faker::TvShows::RickAndMorty.quote,
        price: Faker::Commerce.price.to_f
        )
    end
end
  
puts "10 Departments Seeded, 100 Products Seeded"